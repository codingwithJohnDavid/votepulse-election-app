'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { createClient } from '@/lib/supabase/client'

// These values mirror the labels used in the mock-data DemographicBreakdown arrays.
export interface UserProfile {
  ageRange: string | null
  race: string | null
  religion: string | null
  gender: string | null
  politicalAffiliation: string | null
}

const DEFAULT_PROFILE: UserProfile = {
  ageRange: null,
  race: null,
  religion: null,
  gender: null,
  politicalAffiliation: null,
}

const STORAGE_KEY = 'votepulse-user-profile'

interface ProfileContextValue {
  profile: UserProfile
  userId: string | null
  setProfile: (patch: Partial<UserProfile>) => Promise<void>
  clearProfile: () => void
}

const ProfileContext = createContext<ProfileContextValue>({
  profile: DEFAULT_PROFILE,
  userId: null,
  setProfile: async () => {},
  clearProfile: () => {},
})

// Map UserProfile keys ↔ Supabase column names
function profileToRow(p: Partial<UserProfile>): Record<string, string | null> {
  return {
    ...(p.ageRange !== undefined && { age_range: p.ageRange }),
    ...(p.race !== undefined && { race: p.race }),
    ...(p.religion !== undefined && { religion: p.religion }),
    ...(p.gender !== undefined && { gender: p.gender }),
    ...(p.politicalAffiliation !== undefined && { political_affiliation: p.politicalAffiliation }),
  }
}

function rowToProfile(row: Record<string, unknown>): Partial<UserProfile> {
  return {
    ageRange: (row.age_range as string | null) ?? null,
    race: (row.race as string | null) ?? null,
    religion: (row.religion as string | null) ?? null,
    gender: (row.gender as string | null) ?? null,
    politicalAffiliation: (row.political_affiliation as string | null) ?? null,
  }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileRaw] = useState<UserProfile>(DEFAULT_PROFILE)
  const [userId, setUserId] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  // On mount: check auth, load from DB if authenticated else localStorage
  useEffect(() => {
    const supabase = createClient()

    async function load() {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setUserId(user.id)
        const { data } = await supabase
          .from('profiles')
          .select('age_range, race, religion, gender, political_affiliation')
          .eq('id', user.id)
          .single()
        if (data) {
          setProfileRaw({ ...DEFAULT_PROFILE, ...rowToProfile(data) })
        }
      } else {
        // Guest — load from localStorage
        try {
          const stored = localStorage.getItem(STORAGE_KEY)
          if (stored) {
            setProfileRaw({ ...DEFAULT_PROFILE, ...JSON.parse(stored) })
          }
        } catch {
          // corrupt storage — ignore
        }
      }
      setHydrated(true)
    }

    load()

    // Listen for auth state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUserId(session.user.id)
        const { data } = await supabase
          .from('profiles')
          .select('age_range, race, religion, gender, political_affiliation')
          .eq('id', session.user.id)
          .single()
        if (data) {
          setProfileRaw({ ...DEFAULT_PROFILE, ...rowToProfile(data) })
        }
      } else if (event === 'SIGNED_OUT') {
        setUserId(null)
        setProfileRaw(DEFAULT_PROFILE)
        try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const setProfile = useCallback(async (patch: Partial<UserProfile>) => {
    setProfileRaw((prev) => {
      const next = { ...prev, ...patch }
      if (!userId) {
        // Guest — persist to localStorage only
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* ignore */ }
      }
      return next
    })

    if (userId) {
      const supabase = createClient()
      await supabase
        .from('profiles')
        .update(profileToRow(patch))
        .eq('id', userId)
    }
  }, [userId])

  function clearProfile() {
    setProfileRaw(DEFAULT_PROFILE)
    setUserId(null)
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
  }

  if (!hydrated) return null

  return (
    <ProfileContext.Provider value={{ profile, userId, setProfile, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext)
}

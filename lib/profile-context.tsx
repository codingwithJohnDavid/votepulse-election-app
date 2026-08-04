'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

// These values mirror the labels used in the mock-data DemographicBreakdown arrays.
export interface UserProfile {
  /** e.g. '18–24', '25–34', '35–44', '45–54', '55–64', '65+' */
  ageRange: string | null
  /** e.g. 'White', 'Black / African Am.', 'Hispanic / Latino', 'Asian / Pacific Is.', 'Multiracial' */
  race: string | null
  /** e.g. 'Christian', 'Catholic', 'Jewish', 'Muslim', 'Buddhist', 'Hindu', 'Non-religious' */
  religion: string | null
  /** e.g. 'Female', 'Male', 'Non-binary / Other' */
  gender: string | null
  /** e.g. 'Strong Democrat', 'Lean Democrat', 'Independent', 'Lean Republican', 'Strong Republican' */
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
  setProfile: (profile: Partial<UserProfile>) => void
  clearProfile: () => void
}

const ProfileContext = createContext<ProfileContextValue>({
  profile: DEFAULT_PROFILE,
  setProfile: () => {},
  clearProfile: () => {},
})

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileRaw] = useState<UserProfile>(DEFAULT_PROFILE)
  const [hydrated, setHydrated] = useState(false)

  // Rehydrate from localStorage after mount (client only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<UserProfile>
        setProfileRaw({ ...DEFAULT_PROFILE, ...parsed })
      }
    } catch {
      // corrupt storage — ignore
    }
    setHydrated(true)
  }, [])

  function setProfile(patch: Partial<UserProfile>) {
    setProfileRaw((prev) => {
      const next = { ...prev, ...patch }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // storage quota exceeded — ignore
      }
      return next
    })
  }

  function clearProfile() {
    setProfileRaw(DEFAULT_PROFILE)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  if (!hydrated) return null

  return (
    <ProfileContext.Provider value={{ profile, setProfile, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext)
}

import { useEffect, useState } from 'react'
import { NavDropdown } from 'react-bootstrap'

const IS_SERVER = typeof window === 'undefined'
let storedTheme = IS_SERVER ? 'light' : localStorage.getItem('theme')

const arrayOfThemes = [
  { name: 'Light', icon: '☀️' },
  { name: 'Dark', icon: '🌙' },
  { name: 'Auto', icon: '⚙️' }
]

//Modifies the html root element
function modifyDOM(theme: string) {
  if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-bs-theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }
}

export default function DarkModeDropdown() {
  const [mode, setMode] = useState(getPreferredTheme())

  useEffect(() => {
    if (IS_SERVER) return
    modifyDOM(mode)

    // Listen to the color scheme change event
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        modifyDOM(getPreferredTheme())
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function getPreferredTheme() {
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  function setPreferredTheme(theme: string) {
    modifyDOM(theme)
    localStorage.setItem('theme', theme)
    storedTheme = theme
    setMode(theme)
  }

  return (
    <NavDropdown title={<>{arrayOfThemes.find(theme => theme.name.toLowerCase() === mode)?.icon} </>}>
      {arrayOfThemes.map(theme => {
        const active = mode === theme.name.toLowerCase()

        return (
          <NavDropdown.Item
            key={theme.name}
            className={'d-flex align-items-center ' + (active && 'active')}
            onClick={() => {
              setPreferredTheme(theme.name.toLocaleLowerCase())
            }}
          >
            <span className='me-2'>{theme.icon}</span>
            {theme.name}
            <span className='ms-auto'>{active && '✔️'}</span>
          </NavDropdown.Item>
        )
      })}
    </NavDropdown>
  )
}

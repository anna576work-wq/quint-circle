// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from './App'

const storageKey = 'quint-circle:builder:v2'

beforeEach(() => window.localStorage.clear())
afterEach(() => { cleanup(); window.localStorage.clear() })

describe('chord builder interface', () => {
  it('renders 12 note buttons in the fixed pitch-class order', () => {
    const { container } = render(<App />)
    const labels = [...container.querySelectorAll('.circle-note')].map((button) => button.textContent)
    expect(labels).toEqual(['A', 'B♭', 'B', 'C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭'])
  })

  it('changes the chord type while retaining the selected root', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /выбрать основную ноту C$/i }))
    fireEvent.click(screen.getByRole('button', { name: /^m$/ }))
    expect(screen.getByRole('heading', { name: /Cm/ })).toBeTruthy()
    expect(screen.getByText('C · Eb · G')).toBeTruthy()
    expect(screen.getByRole('button', { name: /выбрать основную ноту C$/i }).getAttribute('aria-pressed')).toBe('true')
  })

  it('changes root without resetting the chosen chord type', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('tab', { name: 'Септаккорды' }))
    fireEvent.click(screen.getByRole('button', { name: /Малый минорный септаккорд/ }))
    fireEvent.click(screen.getByRole('button', { name: /выбрать основную ноту Bb$/i }))
    expect(screen.getByRole('heading', { name: /Bbm7/ })).toBeTruthy()
    expect(screen.getByText('Bb · Db · F · Ab')).toBeTruthy()
  })

  it('saves settings and restores them after the app is remounted', () => {
    const view = render(<App />)
    fireEvent.change(screen.getByRole('combobox', { name: 'Язык обозначений нот' }), { target: { value: 'russian' } })
    fireEvent.click(screen.getByRole('tab', { name: 'Альтерированные' }))
    fireEvent.click(screen.getByRole('button', { name: /^7♭9 Доминантсептаккорд с пониженной ноной/ }))
    fireEvent.click(screen.getByRole('button', { name: /выбрать основную ноту Си-бемоль/i }))
    fireEvent.change(screen.getByRole('combobox', { name: 'Предпочтение диезов и бемолей' }), { target: { value: 'flats' } })
    view.unmount()
    render(<App />)
    expect((screen.getByRole('combobox', { name: 'Язык обозначений нот' }) as HTMLSelectElement).value).toBe('russian')
    expect(screen.getByRole('heading', { name: /Си-бемоль7♭9/ })).toBeTruthy()
    expect(window.localStorage.getItem(storageKey)).toContain('"rootPitchClass":10')
  })

  it('falls back safely when persisted state is corrupt', () => {
    window.localStorage.setItem(storageKey, '{broken')
    render(<App />)
    expect(screen.getByRole('heading', { name: /A Мажорное трезвучие/ })).toBeTruthy()
  })
})

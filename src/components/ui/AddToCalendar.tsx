import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { theme } from '@/styles/theme'

interface AddToCalendarProps {
  event: {
    title: string
    date: string
    time?: string
    location?: string
    description?: string
  }
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const CalendarButton = styled.button<{ $variant: string; $size: string; $isOpen: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${({ $size }) => {
    switch ($size) {
      case 'sm': return '0.75rem 1.25rem'
      case 'lg': return '1.25rem 2.5rem'
      default: return '1rem 2rem'
    }
  }};
  font-size: ${({ $size }) => {
    switch ($size) {
      case 'sm': return '0.9rem'
      case 'lg': return '1.2rem'
      default: return '1.1rem'
    }
  }};
  font-weight: ${theme.fontWeights.medium};
  border-radius: 8px;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  border: none;
  text-decoration: none;
  position: relative;
  min-height: 48px; /* Mobile accessibility minimum */
  
  /* Mobile improvements */
  @media (max-width: ${theme.breakpoints.md}) {
    min-height: 52px;
    padding: ${({ $size }) => {
      switch ($size) {
        case 'sm': return '1rem 1.5rem'
        case 'lg': return '1.5rem 2.75rem'
        default: return '1.25rem 2.25rem'
      }
    }};
    font-size: ${({ $size }) => {
      switch ($size) {
        case 'sm': return '1rem'
        case 'lg': return '1.3rem'
        default: return '1.2rem'
      }
    }};
  }
  
  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary.blue};
          color: white;
          &:hover { background: ${theme.colors.primary.teal}; }
        `
      case 'secondary':
        return `
          background: ${theme.colors.primary.red};
          color: white;
          &:hover { background: ${theme.colors.primary.carmin}; }
        `
      default:
        return `
          background: transparent;
          color: ${theme.colors.primary.blue};
          border: 1px solid ${theme.colors.primary.blue};
          &:hover { 
            background: ${theme.colors.primary.blue}; 
            color: white; 
          }
        `
    }
  }}
  
  .dropdown-arrow {
    transition: transform ${theme.transitions.fast};
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid ${theme.colors.gray[300]};
  border-radius: 8px;
  box-shadow: ${theme.shadows.lg};
  z-index: 1000;
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  transform: ${({ $isOpen }) => $isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all ${theme.transitions.fast};
  margin-top: 0.75rem;
  min-width: 260px;
  
  /* Mobile improvements */
  @media (max-width: ${theme.breakpoints.md}) {
    min-width: 280px;
    border-width: 2px;
    box-shadow: ${theme.shadows.lg}, 0 0 0 1px rgba(0,0,0,0.05);
  }
`

const DropdownItem = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  color: ${theme.colors.text.primary};
  text-decoration: none;
  font-size: 1rem;
  font-weight: ${theme.fontWeights.medium};
  border-bottom: 1px solid ${theme.colors.gray[200]};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  min-height: 56px;
  
  &:hover {
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.primary.blue};
  }
  
  &:last-child {
    border-bottom: none;
    border-radius: 0 0 8px 8px;
  }
  
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  
  /* Mobile improvements */
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1.25rem 1.5rem;
    font-size: 1.1rem;
    min-height: 60px;
    gap: 1.25rem;
  }
`

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  color: ${theme.colors.text.primary};
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: ${theme.fontWeights.medium};
  border-bottom: 1px solid ${theme.colors.gray[200]};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  width: 100%;
  text-align: left;
  min-height: 56px;
  
  &:hover {
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.primary.blue};
  }
  
  &:last-child {
    border-bottom: none;
    border-radius: 0 0 8px 8px;
  }
  
  /* Mobile improvements */
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1.25rem 1.5rem;
    font-size: 1.1rem;
    min-height: 60px;
    gap: 1.25rem;
  }
`

export const AddToCalendar: React.FC<AddToCalendarProps> = ({
  event,
  variant = 'outline',
  size = 'md'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Format date and time for calendar services
  const formatDateTime = (date: string, time?: string) => {
    const eventDate = new Date(date)
    
    if (time) {
      const [hours, minutes] = time.split(':')
      eventDate.setHours(parseInt(hours, 10), parseInt(minutes, 10))
    } else {
      eventDate.setHours(18, 0) // Default to 6 PM if no time
    }

    // Format for calendar URLs (YYYYMMDDTHHMMSSZ)
    const start = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    
    // End time (assume 2 hours duration)
    const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000)
    const end = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    
    return { start, end }
  }

  const { start, end } = formatDateTime(event.date, event.time)

  // Generate calendar URLs
  const getGoogleCalendarUrl = () => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      dates: `${start}/${end}`,
      details: event.description || '',
      location: event.location || ''
    })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  const getOutlookUrl = () => {
    const params = new URLSearchParams({
      rru: 'addevent',
      subject: event.title,
      startdt: start,
      enddt: end,
      body: event.description || '',
      location: event.location || ''
    })
    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
  }

  // Generate ICS file content
  const generateICSContent = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Viver Lisboa//Event//PT',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@viverlisboa.pt`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description || ''}`,
      `LOCATION:${event.location || ''}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')
    
    return icsContent
  }

  const downloadICSFile = () => {
    const icsContent = generateICSContent()
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    setIsOpen(false)
  }


  return (
    <DropdownContainer ref={dropdownRef}>
      <CalendarButton
        $variant={variant}
        $size={size}
        $isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        Adicionar ao Calendário
        <span className="dropdown-arrow">▼</span>
      </CalendarButton>
      
      <DropdownMenu $isOpen={isOpen}>
        <DropdownItem
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
        >
          Google Calendar
        </DropdownItem>
        
        <DropdownItem
          href={getOutlookUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
        >
          Outlook Calendar
        </DropdownItem>
        
        <DropdownButton onClick={downloadICSFile}>
          Apple Calendar
        </DropdownButton>
        
        <DropdownButton onClick={downloadICSFile}>
          Download .ics File
        </DropdownButton>
      </DropdownMenu>
    </DropdownContainer>
  )
}

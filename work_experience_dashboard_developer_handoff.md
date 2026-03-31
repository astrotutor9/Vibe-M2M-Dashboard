# Work Experience Challenge Dashboard

## Overview

A temporary web application used during a student work experience challenge where teams compete by completing Stories and managing a virtual currency called Core Coin.

The system runs for a defined time period, typically one week, and is displayed on a shared public screen. Students view progress, while staff control all updates via password protected actions.

A secondary visual Kanban board is used to display the AI development progress of this application.

---

## Product Split

### Product A
Work Experience Competition Dashboard

### Product B
AI Development Kanban (visual only)

---

# Product A Requirements

## Core Concept

- Teams complete Stories to earn Core Coin
- Testing time costs Core Coin per minute
- Staff can apply bonuses and fines
- Teams can go into negative balance
- Winner is the team with the healthiest balance at the end

---

## Users

### Students
- View only
- Can see dashboard and Stories

### Staff
- Full control via password per action

---

## Event Lifecycle

- Configurable start and end date/time
- Typically one week, but flexible
- Editing locked after end time
- Data cleared manually after event

---

## Data Model

### Event
- id
- start_datetime
- end_datetime
- admin_password
- current_testing_rate
- status

### Team
- id
- name

### Story
- id
- number
- title
- description
- reward
- category

### StoryCompletion
- id
- team_id
- story_id
- completed_at
- reward_at_time
- reversed

### LedgerEntry
- id
- team_id
- created_at
- type (testing, bonus, fine, correction)
- amount
- minutes_used (optional)
- rate_used (optional)
- note
- reversed

---

## Core Rules

- Stories can be completed in any order
- All teams can complete the same Story
- A team can only complete each Story once
- Balance updates are transaction based
- Testing charges are calculated automatically
- Balance can go negative

---

## Functional Areas

### 1. Story List

- ~20 predefined Stories
- Displayed on dedicated page
- see file "Mission-to-Mars-Dashboard-Team-Stories.pdf"
- Each Story includes:
  - ID number
  - description
  - acceptance criteria
  - reward value

---

### 2. Team Setup

- Add up to 7 teams
- Initialise balances to 0
- Configure event dates
- Set initial testing rate (default 250 per minute)

---

### 3. Story Completion

- Select team
- Select Story
- Apply reward automatically
- Prevent duplicate completion per team
- Allow correction via reversal

---

### 4. Testing Charges

- Enter minutes used
- System calculates deduction using current rate
- Deduct from balance
- Store rate used at time of entry

---

### 5. Bonuses and Fines

- Add or subtract Core Coin
- Optional note
- Recorded as ledger entries

---

### 6. Dashboard

Displays:

- Team ranking
- Current balances
- Last Story completed

#### Charts

- Line chart
  - X axis: time since start
  - Y axis: number of Stories completed

- Bar chart
  - Team balances comparison

---

### 7. Admin Actions

- Every action requires password
- No persistent unlocked session

Actions include:

- Mark Story complete
- Add testing time
- Add bonus
- Add fine
- Change testing rate
- Reverse actions

---

### 8. Corrections

- All changes recorded as transactions
- Allow reversal of:
  - Story completion
  - testing charge
  - bonus
  - fine

---

## Pages

### Public

1. Dashboard
2. Stories

### Admin (password per action)

3. Actions page
4. Event setup page
5. Optional history page

---

## Backend Requirements

- Small backend required
- Suitable for lightweight hosting such as Netlify
- Must support shared state across devices

---

## Acceptance Criteria

### Setup
- Create event with time window
- Add teams

### Public View
- View dashboard without login
- View Stories
- See live updates

### Admin
- Password required per action
- Apply Story completion
- Apply testing charges
- Apply bonuses and fines
- Change testing rate
- Reverse actions

### Behaviour
- Balance updates correctly
- Charts update dynamically
- Negative balances allowed
- Event locks after end time
- Data can be cleared manually

---

# Product B Requirements

## AI Development Kanban

## Purpose

Visual board showing progress of building Product A.

## Requirements

- Purely visual Kanban board
- No detailed card data required
- Cards display title only
- Maintained by AI
- Students approve work externally

## Columns

- Backlog
- Sprint
- In Progress
- Review
- Blocked
- Done

## Behaviour

- Cards move between columns
- Represents development progress only

---

## Every time you enter Review, use this format:

### Story in Review
- Title:
- Goal:
- What was completed:
- Files changed:
- Code to review:
- How it works:
- What to check:
- Awaiting approval:

## Notes

- Keep implementation simple
- Focus on clarity and reliability over complexity
- Designed for a single shared display

---

## Next Steps for Developers

1. Build backend data model
2. Implement event setup flow
3. Build dashboard UI
4. Implement ledger system
5. Add charts
6. Implement admin actions
7. Add correction workflows
8. Finalise UI for display screen
9. Integrate Kanban visual

---

End of document


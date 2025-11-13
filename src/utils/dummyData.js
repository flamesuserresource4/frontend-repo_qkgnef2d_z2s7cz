// Dummy data for dashboards and tables
export const organizations = [
  { id: 'org_1', name: 'FitLife Clinic', domain: 'fitlife', status: 'active', plan: 'Pro', users: 42, revenue: 1299 },
  { id: 'org_2', name: 'HealthPlus Hospital', domain: 'healthplus', status: 'pending', plan: 'Enterprise', users: 220, revenue: 4999 },
  { id: 'org_3', name: 'WellnessHub', domain: 'wellnesshub', status: 'suspended', plan: 'Basic', users: 12, revenue: 199 },
]

export const users = [
  { id: 'u_1', name: 'Alice Johnson', email: 'alice@fitlife.com', role: 'dietitian', organization: 'FitLife Clinic' },
  { id: 'u_2', name: 'Bob Smith', email: 'bob@healthplus.com', role: 'org-admin', organization: 'HealthPlus Hospital' },
  { id: 'u_3', name: 'Carla Gomez', email: 'carla@wellnesshub.com', role: 'patient', organization: 'WellnessHub' },
]

export const subscriptions = [
  { id: 'sub_1', org: 'FitLife Clinic', plan: 'Pro', status: 'active', amount: 1299, cycle: 'monthly' },
  { id: 'sub_2', org: 'HealthPlus Hospital', plan: 'Enterprise', status: 'trialing', amount: 4999, cycle: 'monthly' },
]

export const payments = [
  { id: 'pay_1', org: 'FitLife Clinic', amount: 1299, date: '2025-01-10', method: 'Card' },
  { id: 'pay_2', org: 'WellnessHub', amount: 199, date: '2025-01-09', method: 'Card' },
]

export const tickets = [
  { id: 't_1', org: 'FitLife Clinic', subject: 'Login issue', status: 'open', priority: 'high' },
  { id: 't_2', org: 'HealthPlus Hospital', subject: 'Billing question', status: 'pending', priority: 'medium' },
]

export const announcements = [
  { id: 'a_1', title: 'New analytics released', date: '2025-01-01' },
]

export const analytics = {
  activeUsers: [40, 60, 80, 100, 120, 140, 160],
  orgGrowth: [1, 2, 3, 5, 8, 13, 21],
  revenue: [100, 200, 300, 450, 700, 1100, 1600],
}

// Organization dashboard data
export const orgOverview = {
  dietitians: 8,
  patients: 120,
  appointments: 34,
}

export const patients = [
  { id: 'p_1', name: 'John Doe', age: 32, assignedTo: 'Alice Johnson', status: 'active' },
  { id: 'p_2', name: 'Jane Stone', age: 28, assignedTo: 'Alice Johnson', status: 'active' },
]

export const appointments = [
  { id: 'ap_1', patient: 'John Doe', date: '2025-01-12 10:00', dietitian: 'Alice Johnson', status: 'confirmed' },
  { id: 'ap_2', patient: 'Jane Stone', date: '2025-01-13 14:00', dietitian: 'Alice Johnson', status: 'pending' },
]

export const mealTemplates = [
  { id: 'm_1', name: 'Weight Loss - Week 1', mealsPerDay: 3 },
  { id: 'm_2', name: 'Muscle Gain - Week 1', mealsPerDay: 5 },
]

export const reminders = [
  { id: 'r_1', type: 'Water', time: 'Every 2 hours' },
]

export const patientProgress = {
  weight: [80, 79.2, 78.9, 78.1, 77.6, 77.0],
  bmi: [26.5, 26.2, 26.0, 25.8, 25.6, 25.4],
  calories: [2200, 2100, 2000, 1950, 1900, 1850],
  water: [1.5, 2.0, 2.2, 2.3, 2.2, 2.5],
}

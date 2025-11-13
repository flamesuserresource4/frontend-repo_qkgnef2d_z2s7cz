export function getSubdomain(hostname) {
  try {
    const host = hostname || window.location.hostname
    const parts = host.split('.')
    if (parts.length < 3) return null
    return parts[0]
  } catch {
    return null
  }
}

export function getTenantBasePath(role) {
  switch (role) {
    case 'super-admin':
      return '/super-admin'
    case 'org-admin':
      return '/organization'
    case 'dietitian':
      return '/dietitian'
    case 'patient':
      return '/patient'
    default:
      return '/'
  }
}

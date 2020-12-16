export function roles ({ data }) {
  return _(data).map('role').uniq().value()
}

export function role_users ({ data }) {
  return (role) => _(data).filter(['role',role]).value()
}

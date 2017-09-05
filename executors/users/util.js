export default {
  mapToUserViewModel(user) {
    return {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname
    }
  }
}

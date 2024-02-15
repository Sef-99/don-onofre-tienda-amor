const listaUsuarios = {
  admin: {
    email: "test@test.com",
    password: "password",
    role: "admin",
  },
  user1: {
    email: "test2@test.com",
    password: "GenericPassword@",
    role: "user",
  },
  user2: {
    email: "test3@test.com",
    password: "GenericPassword@",
    role: "user",
  },
};

console.log(localStorage.getItem("users"));

if (localStorage.getItem("users") === null) {
  const stringifiedUsers = JSON.stringify(listaUsuarios);
  localStorage.setItem("users", stringifiedUsers);
}

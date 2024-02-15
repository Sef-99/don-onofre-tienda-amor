const listaUsuarios = {
  "test@test.com": {
    username: "admin",
    password: "password",
    role: "admin",
  },
  "test2@test.com": {
    username: "user1",
    password: "GenericPassword@",
    role: "user",
  },
  "test3@test.com": {
    username: "user2",
    password: "GenericPassword@",
    role: "user",
  },
};

console.log(localStorage.getItem("users"));

if (localStorage.getItem("users") === null) {
  const stringifiedUsers = JSON.stringify(listaUsuarios);
  localStorage.setItem("users", stringifiedUsers);
}

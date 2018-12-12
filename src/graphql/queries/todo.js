export const listTodos = `query listTodos {
  listTodos{
    items{
      id
      name
      description
    }
  }
}`;

export const addTodo = `mutation createTodo($name:String! $description: String!) {
  createTodo(input:{
    name:$name
    description:$description
  }){
    id
    name
    description
  }
}`;

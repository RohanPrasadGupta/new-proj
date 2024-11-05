export const addUser = async (data: any) => {
  console.log(data);
  const response = await fetch("http://localhost:5000/v1/Signup/User", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

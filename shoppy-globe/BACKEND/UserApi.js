// Register API
export const registerAPI = async (registerDetails) => {
  try {
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerDetails),
    });

    const data = await res.json();
    console.log(data)
    // Backend returned an error
    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    // Check if token exists
    if (!data.token) {
      throw new Error("No token received from server");
    }

    // Save token to localStorage
    localStorage.setItem("token", data.token);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Registration API error:", error.message);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};

// Login API
export const loginAPI = async (loginDetails) => {
  try {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    });

    const data = await res.json();

    // Backend returned an error
    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Check if token exists
    if (!data.token) {
      throw new Error("No token received from server");
    }

    // Save token to localStorage
    localStorage.setItem("token", data.token);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Login API error:", error.message);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};

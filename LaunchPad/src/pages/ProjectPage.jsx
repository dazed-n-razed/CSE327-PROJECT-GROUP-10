const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to create a project.");
      setLoading(false);
      return;
    }

    // Ensure that goalAmount is a number, not a string
    const projectData = {
      ...formData,
      goalAmount: Number(formData.goalAmount),
    };

    // Call the createProject function
    const response = await createProject(projectData, token);
    alert("Project created successfully!");
    navigate("/profile");
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

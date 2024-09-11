export const signUp = async (req, res) => {
  try {
  } catch (error) {
    console.log(`Error in signup controller`, error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const login = async (req, res) => {};
export const logout = (req, res) => {};

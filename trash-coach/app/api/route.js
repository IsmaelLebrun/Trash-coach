import mysql from "mysql2/promise";

// Fonction handler de l'API
export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "trashCoach",
  });

  console.log("test");
  try {
    const [rows] = await connection.execute("SELECT * FROM notes");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  } finally {
    await connection.end();
  }
}

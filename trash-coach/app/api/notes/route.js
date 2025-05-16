import mysql from "mysql2/promise";

export async function POST(req) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "trashCoach",
  });

  try {
    const { note, effect } = await req.json();

    await connection.execute("INSERT INTO notes (note, effect) VALUES (?, ?)", [note, effect]);

    return new Response(JSON.stringify({ message: "Note ajoutée avec succès" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Permet les requêtes de tous les domaines
        "Access-Control-Allow-Methods": "POST, OPTIONS", // Autorise POST et OPTIONS
      },
    });
  } catch (error) {
    console.error("Erreur MySQL :", error);

    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Même chose ici
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  } finally {
    await connection.end();
  }
}

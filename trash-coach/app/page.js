import Image from "next/image";
import Link from "next/link";
import mysql from "mysql2/promise";

function htmlGenerate (response){
  response.forEach(element => {
    return <p value="element.note"></p>;
  });
};

export default async function Home() {
  let connexion = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "trashCoach",
  });
  
  try {
    const response = await connexion.execute("SELECT * FROM notes");    
    console.log(response[0]);
    return htmlGenerate(response[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
    return err;
  } finally {
    await connexion.end();
  }
}

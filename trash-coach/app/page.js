import Image from "next/image";
import Link from "next/link";
import mysql from "mysql2/promise";

export default async function Home() {
  let connexion = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "trashCoach",
  });
  
  try {
    const HttpResponse = await connexion.execute("SELECT * FROM notes");
    const response = HttpResponse[0];


    let goodNote = [];
    let badNote = [];
    response.forEach((element) => {
      if(element.effect > 2){
        goodNote.push(element);
      }else{
        badNote.push(element);
      }
    });
    return (
      <div className="notes-container flex flex-col lg:flex-row gap-6 p-4">
        <div className="bad-notes bg-red-50 shadow-md rounded-2xl p-6 flex-1">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Bad Notes</h2>
          {badNote.length > 0 ? (
            badNote.map((element) => (
              <div key={element.id} className="note bg-red-100 p-4 rounded-lg mb-2">
                <p>{element.note}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No bad notes found</p>
          )}
        </div>
        <div className="good-notes bg-green-50 shadow-md rounded-2xl p-6 flex-1">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Good Notes</h2>
          {goodNote.length > 0 ? (
            goodNote.map((element) => (
              <div key={element.id} className="note bg-green-100 p-4 rounded-lg mb-2">
                <p>{element.note}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No good notes found</p>
          )}
        </div>
      </div>
    );

      } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
    return err;
  } finally {
    await connexion.end();
  }
}

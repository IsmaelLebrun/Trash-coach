import Image from "next/image";
import Link from "next/link";
import mysql from "mysql2/promise";
import FormComponent from "./FormComponent";
import dynamic from "next/dynamic";

export default async function Home() {
  let connexion = await mysql.createConnection({
      host: "localhost",
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: "trashCoach",
  });

  let compliment = [
    "tkt ca va aller",
    "continue mon reuf",
    "t'es sur la bonne voie",
    "tout le mondre croit en toi",
    "n'abandonne pas",
    "persiste, continue, avance !"
  ];
  let rabaissement = [
    "mange tes morts",
    "sac à merde",
    "t'es sérieux ? même le cadavre de ma grand-mère fait mieux",
    "t'aurais pu mourir",
    "ta tête de gargouille retourne lécher les boules de satan",
    "tu t'es cru sur minecraft en peaceful ?",
    "même les bots te trickshot",
    "t'es mauvais jack, t'es mauvais"
  ];

  let message = "";

  try{
    const HttpResponse = await connexion.execute("SELECT effect FROM notes");
    const response = HttpResponse[0];

    let noteTotal = 0;
    response.forEach((element)=> {
      noteTotal = noteTotal + element;
    });
    const moyenne = noteTotal / response.length;
    if(moyenne >= (response.lenght / 2)){
      // moyenne bonne
      let random = Math.floor(Math.random() * compliment.length);
      message = compliment[random];
    }else{
      let random = Math.floor(Math.random() * rabaissement.length);
      message = rabaissement[random];
    }
  }catch(err){
    console.error("erreur server : " + err)
  }

  let goodNote = [];
  let badNote = [];
  try {
    const HttpResponse = await connexion.execute("SELECT * FROM notes");
    const response = HttpResponse[0];

    response.forEach((element) => {
      if(element.effect > 2){
        goodNote.push(element);
      }else{
        badNote.push(element);
      }
    });
    badNote.reverse();
    goodNote.reverse();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
    return err;
  } finally {
    await connexion.end();
  }
  return (
    <div className="notes-container flex flex-col lg:flex-row gap-6 p-4">
      <h1>{message}</h1>  
      <div className="bad-notes bg-red-50 shadow-md rounded-2xl p-6 flex-1">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Bad Notes</h2>
        {badNote.length > 0 ? (
          badNote.map((element) => (
            <div key={element.id} className="note bg-red-100 p-4 rounded-lg mb-2">
              <p>{element.note}</p><div>↓</div>
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
              <p>{element.note}</p><div>↑</div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No good notes found</p>
        )}
      </div>
      <FormComponent />
    </div>
  );
}

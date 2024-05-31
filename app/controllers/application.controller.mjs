import {
    createNote,
    indexNotes,
    editNote,
  } from "../services/note.service.mjs";
  
  export function loadApplicationController(app) {
    const db = app.get("g:db");
  
    app.get('/notes', async (req, res) => {
        try {
            const notes = await indexNotes(db);
            res.render('note', { notes: notes });
        } catch (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des notes.');
        }
    });

    app.get("/note/add", (req, res) => res.render("noteForm"));
    app.get("/note/edit/:id", (req, res) => editNote(req, res));
    app.all("/note", (req, res) => createNote(req, res));
  
    app.get("/error", (req, res) => console.log(req.err));
  
    // définir les routes de l'application ici ...
  }
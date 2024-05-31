import {
    createNote,
    indexNotes,
    editNote,
  } from "../services/note.service.mjs";
  
  export function loadApplicationController(app) {
    const db = app.get("g:db");
  
    app.get("/note", (req, res) => indexNotes(req, res));
    // app.post('/note', async (req, res) => {
    //     try {
    //         const { title, content, owned_id } = req.body;
    //         const newNote = await createNote(db, { title, content, owned_id });
    //         res.redirect(`/note/${newNote.id}`);
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send('Erreur lors de la création de la note.');
    //     }
    // });
    app.get("/note/add", (req, res) => res.render("noteForm"));
    app.get("/note/edit/:id", (req, res) => editNote(req, res));
    app.all("/note", (req, res) => createNote(req, res));
  
    app.get("/error", (req, res) => console.log(req.err));
  
    // définir les routes de l'application ici ...
  }
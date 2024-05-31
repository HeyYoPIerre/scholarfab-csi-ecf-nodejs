export function createNote(db, { title, context, owned_id }) {
    return new Promise(async (resolve, reject) => {
        const stmt = db.prepare('INSERT INTO notes(title, context, owned_id) VALUES (?,?,?)');
        stmt.run([title, context, owned_id], (err, data) => {
            const result = err? err : data;
            (err? reject : resolve)(result);
        });
    });
}

export function editNote(db, { id, title, context, owned_id }) {
    return new Promise(async (resolve, reject) => {
        const stmt = db.prepare('UPDATE notes SET title =?, context =?, owned_id =? WHERE id =?');
        stmt.run([title, context, owned_id, id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: stmt.changes() });
            }
        });
    });
}

export function indexNotes(db, userId = null) {
    return new Promise(async (resolve, reject) => {
        let query = 'SELECT * FROM notes';
        if (userId) {
            query += ' WHERE owned_id =?';
        }
        const stmt = db.prepare(query);
        stmt.all(userId? [userId] : [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
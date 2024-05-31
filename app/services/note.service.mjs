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

export async function indexNotes(db) {
    const sql = 'SELECT * FROM notes ORDER BY title ASC';
    const rows = [];
    const results = await db.all(sql);

    results.forEach(row => {
        rows.push({
            title: row.title,
            context: row.context,
            owned_id: row.owned_id
        });
    });

    return rows;
}
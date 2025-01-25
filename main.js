
import request from 'request-promise'
import { listofids } from './list_ids.js';
import 'dotenv/config'


const token = process.env.API_TOKEN;
const idsToDelete = listofids;
const apihost = process.env.API_HOST;
const url = `https://${apihost}/webservice/v1/radpop_radio_cliente_fibra/`;

async function deleteById(id) {
    const options = {
        method: 'DELETE',
        url: `${url}${id}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + Buffer.from(token).toString('base64'),
        },
        json: true,
    };

    try {
        const response = await request(options);
        console.log(`Successfully deleted ID: ${id}`);
        return response;
    } catch (error) {
        console.error(`Failed to delete ID: ${id}`, error.message);
        throw error;
    }
}

async function deleteAllIds(ids) {
    for (const id of ids) {
        try {
            await deleteById(id);
        } catch (error) {
            console.error(`Error processing ID: ${id}`, error.message);
        }
    }
    console.log("Finished processing all IDs.");
}


(async () => {
    await deleteAllIds(idsToDelete);
})();

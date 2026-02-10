import axios from "axios";
import 'dotenv/config';
const RELEASE_ID = process.env.RELEASE_ID;
const API_KEY = process.env.API_KEY;
const API_URL = `https://sendflow.pro/sendapi/releases/${RELEASE_ID}/analytics`;
const N8N_WEBHOOK_URL = 'https://n8n-n8n.e4wfok.easypanel.host/webhook-test/automation-leads-analytics';

async function fetchAndSendLeads() {
    try {
        console.log('Iniciando busca de analytics...');

        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const leads = response.data.contacts || []; 

        if (leads.length === 0) {
            console.log('Nenhum lead encontrado nesta release.');
            return;
        }

        console.log(`Formatando ${leads.length} leads para o n8n...`);

        await axios.post(N8N_WEBHOOK_URL, {
            leads: leads,
            total_count: leads.length,
            release_id: RELEASE_ID,
            data_extracao: new Date().toISOString()
        });

        console.log('Dados enviados com sucesso ao n8n!');

    } catch (error) {
        console.error('Erro ao processar leads:', error.response ? error.response.data : error.message);
    }
}

fetchAndSendLeads();
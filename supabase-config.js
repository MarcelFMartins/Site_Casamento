// Configuração do Supabase para o Mural de Recados
// Substitua os valores abaixo pelos dados do SEU projeto Supabase.
// Veja o passo a passo em SUPABASE-SETUP.md

const SUPABASE_URL = 'COLE_AQUI_A_URL_DO_SEU_PROJETO';
const SUPABASE_ANON_KEY = 'COLE_AQUI_A_ANON_KEY_DO_SEU_PROJETO';

window.supabaseClient =
    SUPABASE_URL.startsWith('http') && SUPABASE_ANON_KEY.length > 10
        ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
        : null;

if (!window.supabaseClient) {
    console.warn('Supabase não configurado: edite supabase-config.js com sua URL e anon key.');
}

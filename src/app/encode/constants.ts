export const ENCODE_TEST_URL = "/encode";

export enum SessionsEnum {
    SessionOne = 'session_1',
    SessionTwo = 'session_2'
}

// Admin
export enum PerpetratorCondition {
    A = "Perpetrador 1 Presente, Perpetrador 2 Ausente",
    B = "Perpetrador 2 Presente, Perpetrador 1 Ausente"
}

// Personal info
export enum Gender
{
    Male = "Masculino",
    Female = "Femenino",
    NonBinary = "No Binario"
}

export enum EducationLevel
{
    incompleteSecondary = "Secundario incompleto",
    completeSecondary = "Secundario completo",
    incompleteTertiary = "Terciario incompleto",
    completeTertiary = "Terciario completo",
    incompleteBachelors = "Universitario incompleto",
    completeBachelors = "Universitario completo"
}

export enum SomnolenceDegree
{
    totallyAwake = "Me siento activo, vital, alerta o bien despierto.",
    veryHigh = "Funcionando a niveles altos, pero no completamente alerta.",
    relaxed= "Despierto, pero relajado; sensible pero no completamente alerta.",
    littleConfused= "Un poco confundido, decepcionado.",
    confused= "Confundido; pierdo interés en permanecer despierto; ralentizado.",
    tired= "Somnoliento, mareado, luchado contra el sueño; prefiero recostarme.",
    almostSlept= "Ya no lucho contra el sueño, comenzaré a dormirme pronto; tengo pensamientos como sueños.",
    slept= "Dormido."
}

// Video
export const VIDEO_PATH = "assets/videos/videoEncode.mp4";
export enum VideoState
{
    Play,
    Pause
};

// Audio recorder
export const REC_OPTIONS = { mimeType: 'audio/webm' };
export enum RecorderStatus
{
    Ready = "Esperando para grabar",
    Recording = "GRABANDO"
};

// Identification task
export const PERPETRATOR_1_ID = "PERP_1";
export const PERPETRATOR_2_ID = "PERP_2";
export const ABSENT_SUSPECT_ID = "00";
export const ROOM_1_TITLE = "Ronda 1 de 2";
export const ROOM_2_TITLE = "Ronda 2 de 2";

// Sorting task
// export const MAX_TIMELINE_SCREENSHOTS = 8;
export const SCREENSHOTS_COUNT = 8;
export const HAS_CURSOR_CLASS = 'hasCursor';

// Video Task Instructions
export const VIDEO_INSTRUCTIONS: string[] = [
    'A continuación vas a visualizar un video corto  y te pedimos por favor que le prestes atención.',
    'Asegúrate de estar en un lugar tranquilo y sin interrupciones.',
    'Tené en cuenta que una vez que comience no podrás detenerlo.'
];

// Suspect Identification Task Instructions
export const IDENTIFICATION_INSTRUCTIONS: string[] = [
    'A continuación vas a realizar dos rondas de reconocimiento correspondientes cada una a uno de los asaltantes del video de la sesión anterior.',
    'Cada ronda está compuesta por fotos de 6 sospechosos en donde puede estar presente o no el asaltante.',
    'Te vamos a pedir que las mires con atención y selecciones la opción que creas correcta.'
];

// Selection Task Instructions
export const SELECTION_INSTRUCTIONS: string[] = [
    'Ahora te vamos a pedir que selecciones de entre 12 pares de fotos.',
    'Tenés que seleccionar la que corresponde con lo que viste en el video.'
];

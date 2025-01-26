import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.resolve(__dirname, "../config/config.json");
const configJson = JSON.parse(await fs.promises.readFile(configPath, "utf8"));

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configJson[env];

const db = {};

/** 
 * Inicializa una nueva instancia de Sequelize basada en la configuración. 
 * Si `use_env_variable` está definido, utiliza una variable de entorno.
 */
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

/**
 * Carga todos los modelos dinámicamente desde el directorio actual.
 * Los modelos se agregan al objeto `db` para un acceso centralizado.
 */
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );

for (const file of modelFiles) {
  const modelPath = pathToFileURL(path.join(__dirname, file)).href; // Convertir la ruta a una URL válida
  const model = (await import(modelPath)).default(
    sequelize,
    Sequelize.DataTypes
  );
  db[model.name] = model;
}

/**
 * Configura las asociaciones entre los modelos.
 * Si un modelo define un método `associate`, se ejecutará para establecer las relaciones.
 */
Object.keys(db).forEach((modelName) => {
  if (db[modelName]?.associate) {
    db[modelName].associate(db);
  }
});

// Exportar la instancia de Sequelize y los modelos
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

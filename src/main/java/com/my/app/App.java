import static spark.Spark.*;

import java.util.*;
import com.google.gson.*;

public class App {

    private static Gson gson = new Gson();

    public static void main(String[] args) {
        
        port(getHerokuAssignedPort());

        String projectDir = System.getProperty("user.dir");
        staticFiles.externalLocation(projectDir + "/src/main/resources/public");

        // Ruta de la pagina principal
        get("/", (req, res) -> {
            res.redirect("home/index.html");
            return null;
        });

        //Ruta del login
        get("/login", (req, res) -> {
            res.redirect("login/index.html");
            return null;
        });

        // Ruta del dashboard
        get("/board", (req, res) -> {

            // Obtenemos los datos de la query
            String usuario = req.queryParams("usuario");
            String password = req.queryParams("password");

            // Vemos si coincide con nuestro usuario
            if(usuario.equals("unusuario") && password.equals("1234")) {

                // Si coincide redirigimos
                res.status(200);
                res.redirect("/dashboard/index.html");
            }
            else {
                System.out.println("Permiso denegado");
                res.status(404);
            }

            return res;
        });

        // Obtener citas
        get("/cita", (req, res) -> {

            return gson.toJson(DAO.dameCitas());
        });

        // Guardar cita en base de datos
        post("/cita", (req, res) -> {

            String data = req.body();
            Cita cita = gson.fromJson(data, Cita.class);
            
            String id = UUID.randomUUID().toString();
            cita.setID(id);

            return DAO.crearCita(cita);
        });

        // Eliminar cita
        delete("/cita/:nombre", (req, res) -> {
            System.out.println(req.params("nombre"));
            return DAO.eliminarCita(req.params("nombre"));
        });

        // Actualizar cita
        put("/cita", (req, res) -> {
            String data = req.body();
            Cita cita = gson.fromJson(data, Cita.class);

            return DAO.actualizarCita(cita);
        });
    }

    static int getHerokuAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 7072;
    }
}

/*
cls && mvn compile && mvn exec:java -D"exec.mainClass"="App"
*

/*
mvn clean compile assembly:single
*/
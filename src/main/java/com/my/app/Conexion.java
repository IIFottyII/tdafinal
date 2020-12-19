import java.sql.*;
import java.sql.SQLException;
import java.lang.ClassNotFoundException;

public class Conexion {
    private static String url = "jdbc:mysql://db4free.net:3306/consultabdtest?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
    private static String driverName ="com.mysql.cj.jdbc.Driver";
    private static String user = "admnstrador";
    private static String password ="321654987";
    private static Connection conen = null;
    
    public static Connection getConnection(){
        
        try{
            
            Class.forName(driverName);
            conen = DriverManager.getConnection(url,user,password);
        
        }catch(SQLException e){
            e.printStackTrace();
        }catch(ClassNotFoundException e){
            e.printStackTrace();
        }
        return conen;
    }

}

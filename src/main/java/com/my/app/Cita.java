public class Cita {

    private String id;
    private String nombre;
    private String fecha;
    private String doctor;
    private String pruebas;

	public Cita(String nombre, String fecha, String doctor, String pruebas) {
		this.setNombre(nombre);
		this.setFecha(fecha);
		this.setDoctor(doctor);
        this.setPruebas(pruebas);
	}

	public Cita() { }

    public String getID() {
        return this.id;
    }

    public void setID(String id){
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    public String getFecha(){
        return this.fecha;
    }

    public void setFecha(String fecha){
        this.fecha = fecha;
    }

    public String getDoctor(){
        return this.doctor;
    }

    public void setDoctor(String doctor){
        this.doctor = doctor;
    }

    public String getPruebas(){
        return this.pruebas;
    }

    public void setPruebas(String pruebas){
        this.pruebas = pruebas;
    }
}

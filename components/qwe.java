@Entity
public class Lesson {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String title;
	@ManyToOne
	@JsonIgnore
	private Module module;
	@OneToMany(mappedBy="lesson")
	@JsonIgnore
	private List<Widget> widgets;
}
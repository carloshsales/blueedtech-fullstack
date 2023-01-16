import { Container, Input, Button, Flex, Item } from "./styles/Index";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function App() {
	const url = "http://localhost:3000/tasks";

	const [task, setTask] = useState("");
	const [listTasks, setListTasks] = useState([]);

	const addTask = async () => {
		if (!task) return alert("Preencha com uma tarefa!");
		const newTask = {
			id: uuidv4(),
			task: task,
			checked: false,
		};

		const data = await axios.post(url, newTask);

		setListTasks([...listTasks, data.data]);
		setTask("");
	};

	const loadTasks = async () => {
		const data = await axios.get(url).then((response) => response.data);
		setListTasks(data);
	};

	useEffect(() => {
		loadTasks();
	}, addTask);

	const removeTask = (id) => {
		const newListTask = listTasks.filter((task) => task.id !== id);
		setListTasks(newListTask);
	};

	const toggleTask = (id, checked) => {
		const index = listTasks.findIndex((task) => task.id === id);
		const newList = listTasks;
		newList[index].checked = !checked;
		setListTasks([...newList]);
	};

	return (
		<>
			<Container>
				<h1 className="title">TO-DO LIST</h1>
				<Flex direction="row">
					<Input
						value={task}
						placeholder="Digite sua tarefa:"
						onChange={(e) => setTask(e.target.value)}
					/>
					<Button onClick={addTask}>Adicionar</Button>
				</Flex>

				<ul>
					{listTasks.map((task) => (
						<Item checked={task.checked} key={task.id}>
							<p>{task.task}</p>
							<Flex direction="row">
								<button
									onClick={() =>
										toggleTask(task.id, task.checked)
									}
								>
									<i class="bx bx-check"></i>
								</button>
								<button onClick={() => removeTask(task.id)}>
									<i class="bx bx-trash"></i>
								</button>
							</Flex>
						</Item>
					))}
				</ul>
			</Container>
		</>
	);
}

export default App;

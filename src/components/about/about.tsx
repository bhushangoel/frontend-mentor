import { useEffect, useState } from "react";
import "./about.css";

export const About = () => {
	const [user, setUser] = useState<any>({});
	const [userProfiles, setUserProfiles] = useState([
		{ url: "https://www.linkedin.com/in/bhushangoel/", name: "Linkedin" },
		{ url: "https://bhushangoel.github.io/", name: "Website" },
	]);

	const getProfile = async () => {
		const response = await fetch("https://api.github.com/users/bhushangoel");
		const githubProfile = response.json();
		console.log("githubProfile : ", githubProfile);
		return githubProfile;
	};

	useEffect(() => {
		const getUsers = async () => {
			const user = await getProfile();
			setUser(user);
			setUserProfiles((prev) => [...prev, { url: user.html_url, name: "Github" }]);
		};

		getUsers();
	}, []);
	return (
		<>
			<div className="profile-page">
				<h2>My profile</h2>
				<p>
					Used all important concepts like -
					<code>useContext, useState, useEffect, fetch, async-await</code>
				</p>
				<div className="profile-box">
					<img className="user-img" src={user.avatar_url} alt="" />
					<h2>{user.name}</h2>
					<ul>
						{userProfiles.map((profiles) => {
							return (
								<li className="profile">
									<a href={profiles.url} target="_blank" rel="noopener noreferrer">{profiles.name}</a>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
};

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function OrganizationPage() {
    const { id } = useParams();
    const [organization, setOrganization] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/organizations/${id}`)

            .then(response => response.json())
            .then(data => setOrganization(data));
    }, [id]);

    if (!organization) return <p>Загрузка...</p>;

    return (
        <div>
            <h1>{organization.name}</h1>
            <img src={`http://127.0.0.1:8000/uploads/${organization.avatar}`} alt="Логотип" width="200" />
            <p>{organization.description}</p>
            <p>Email: {organization.email}</p>
            <p>Теги: {organization.tags}</p>
        </div>
    );
    
}

export default OrganizationPage;

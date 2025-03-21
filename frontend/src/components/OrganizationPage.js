import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './home.css';

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
        <div className="organization-container">
            <h1>{organization.name}</h1>
            <img 
                src={`http://127.0.0.1:8000/uploads/${organization.avatar}`} 
                alt="Логотип" 
                className="organization-avatar" 
            />
            <div className="organization-info">
                <p>{organization.description}</p>
                <p>Email: <strong>{organization.email}</strong></p>
                <p className="organization-tags">Теги: {organization.tags}</p>
            </div>
        </div>
    );
}

export default OrganizationPage;

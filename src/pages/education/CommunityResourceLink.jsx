import community from '../../data/educationCommunity.json';
export default function CommunityResourceLink({ locale = 'en' }) {
  const es = locale === 'es';
  return <aside className="edu-panel" style={{ marginTop: 28 }}>
    <div className="edu-kicker">IPM · Discord</div>
    <h2>{es ? 'Converse con la comunidad' : 'Connect with the community'}</h2>
    <p>{es ? 'IPM Host & Owner Club reúne a propietarios, anfitriones y administradores. Use el canal de bienvenida para encontrar recursos y orientación. La membresía de Whop y los permisos de cada canal se gestionan por separado.' : 'IPM Host & Owner Club brings together owners, hosts and property managers. Start in the welcome channel to find resources and guidance. Whop membership and individual channel permissions are managed separately.'}</p>
    <a className="edu-btn" href={community.discordInviteUrl} target="_blank" rel="noopener noreferrer">{es ? 'Abrir comunidad en Discord' : 'Open the Discord community'} →</a>
    <p style={{ marginTop: 14, fontSize: '.85rem' }}>{es ? 'Invitación verificada; Discord no indica una fecha de vencimiento. Las reglas de acceso se muestran dentro de la comunidad.' : 'Verified invite; Discord reports no expiration date. Access rules are shown inside the community.'}</p>
  </aside>;
}

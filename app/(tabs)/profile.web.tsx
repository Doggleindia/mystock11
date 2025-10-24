import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

export default function ProfileWebScreen() {
  const router = useRouter();
  const { user, fetchProfile, logout } = useAuthStore();
  
  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="web-safe-view">
      <Stack.Screen options={{ headerShown: false }} />
      <div className="web-container">
        <div className="web-card" style={{ marginTop: '80px' }}>
          {/* Profile Header */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={user?.avatar || 'https://randomuser.me/api/portraits/women/10.jpg'}
                alt="Profile"
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <button
                className="web-button"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  padding: '8px',
                  minWidth: 'auto',
                  borderRadius: '50%'
                }}
              >
                📷
              </button>
            </div>
            <div style={{ marginLeft: '16px' }}>
              <h1 style={{ margin: 0, color: '#333' }}>
                {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
              </h1>
              <p style={{ margin: '4px 0', color: '#666' }}>
                Level {user?.level || 1}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div className="web-card" style={{ textAlign: 'center' }}>
              <p style={{ color: '#666', fontSize: '14px', margin: '0 0 4px' }}>Contests</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                {user?.totalContests || 0}
              </p>
            </div>
            <div className="web-card" style={{ textAlign: 'center' }}>
              <p style={{ color: '#666', fontSize: '14px', margin: '0 0 4px' }}>Wins</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                {user?.totalWins || 0}
              </p>
            </div>
            <div className="web-card" style={{ textAlign: 'center' }}>
              <p style={{ color: '#666', fontSize: '14px', margin: '0 0 4px' }}>Win Rate</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                {user?.totalContests ? ((user.totalWins / user.totalContests) * 100).toFixed(1) : 0}%
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: "My Information", icon: "👤", route: "/profile/information" },
              { label: "Notifications", icon: "🔔", route: "/profile/notifications" },
              { label: "Help and Support", icon: "❓", route: "/kyc/help-support" },
              { label: "Terms and Policy", icon: "📄", route: "/profile/policy" }
            ].map((item, index) => (
              <button
                key={index}
                className="web-card"
                onClick={() => router.push(item.route)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  backgroundColor: '#f8f8f8'
                }}
              >
                <span style={{ marginRight: '12px' }}>{item.icon}</span>
                <span className="web-text">{item.label}</span>
              </button>
            ))}
            
            <button
              className="web-card"
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                backgroundColor: '#f8f8f8',
                color: '#dc2626'
              }}
            >
              <span style={{ marginRight: '12px' }}>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
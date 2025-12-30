'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OwnerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const login = async () => {
    const res = await fetch('/api/owner/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/owner/dashboard');
    } else {
      const err = await res.json();
      alert(err.error);
    }
  };

  return (
    <main style={{ minHeight:'100vh',display:'flex',justifyContent:'center',alignItems:'center' }}>
      <div style={{ width:360,padding:30,background:'#1e293b',borderRadius:16 }}>
        <h2 style={{ color:'#fff',textAlign:'center' }}>Login Owner</h2>

        <input
          placeholder="Email"
          onChange={e=>setEmail(e.target.value)}
          style={input}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
          style={input}
        />

        <button onClick={login} style={btn}>Masuk</button>
      </div>
    </main>
  );
}

const input = {
  width:'100%',
  padding:10,
  marginBottom:12,
  borderRadius:8,
  border:'none'
};

const btn = {
  width:'100%',
  padding:12,
  borderRadius:10,
  border:'none',
  background:'#f59e0b',
  fontWeight:'bold'
};

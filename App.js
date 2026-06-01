// App.js
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import ApostarScreen  from './src/screens/ApostarScreen';
import BichosScreen   from './src/screens/BichosScreen';
import HistoricoScreen from './src/screens/HistoricoScreen';

const TABS = [
  { id:'apostar',  label:'Apostar',   icon:'🎲' },
  { id:'bichos',   label:'Bichos',    icon:'🐾' },
  { id:'historico',label:'Histórico', icon:'📋' },
];

export default function App() {
  const [tab,      setTab]      = useState('apostar');
  const [saldo,    setSaldo]    = useState(100);
  const [historico,setHistorico]= useState([]);

  function addHistorico(reg) {
    setHistorico(h => [reg, ...h].slice(0, 30));
  }

  return (
    <SafeAreaView style={s.safe}>
      <ExpoStatusBar style="light" />

      {/* HEADER */}
      <LinearGradient colors={['#2563eb','#1d4ed8']} style={s.header}>
        {/* Bolhas decorativas */}
        {[[70,-20,-10],[50,5,60],[90,-30,130],[60,8,230],[80,-25,310],[50,10,400]].map(([w,t,l],i) => (
          <View key={i} style={[s.bolha, { width:w, height:w, top:t, left:l }]} />
        ))}
        <View style={s.headerInner}>
          <View>
            <Text style={s.headerTitulo}>🎲 Jogo do Bicho</Text>
            <Text style={s.headerSub}>LOTERIA FEDERAL</Text>
          </View>
          <View style={s.saldoBox}>
            <Text style={s.saldoLabel}>SALDO</Text>
            <Text style={[s.saldoValor, saldo < 10 && { color:'#fca5a5' }]}>
              R$ {saldo.toFixed(2)}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* CONTEÚDO */}
      <View style={{ flex:1 }}>
        {tab === 'apostar'   && <ApostarScreen  saldo={saldo} setSaldo={setSaldo} addHistorico={addHistorico} />}
        {tab === 'bichos'    && <BichosScreen />}
        {tab === 'historico' && <HistoricoScreen historico={historico} irApostar={() => setTab('apostar')} />}
      </View>

      {/* BOTTOM NAV */}
      <View style={s.nav}>
        {TABS.map(t => {
          const ativo = tab === t.id;
          return (
            <TouchableOpacity
              key={t.id}
              style={[s.navBtn, ativo && s.navBtnAtivo]}
              onPress={() => setTab(t.id)}
              activeOpacity={0.7}
            >
              <Text style={s.navIcon}>{t.icon}</Text>
              <Text style={[s.navLabel, ativo && s.navLabelAtivo]}>{t.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex:1, backgroundColor:'#1d4ed8' },

  // Header
  header:      { paddingHorizontal:18, paddingTop: Platform.OS==='android'?StatusBar.currentHeight+10:10, paddingBottom:14, overflow:'hidden' },
  bolha:       { position:'absolute', borderRadius:999, backgroundColor:'rgba(255,255,255,0.15)' },
  headerInner: { flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  headerTitulo:{ fontSize:18, fontWeight:'800', color:'#fff' },
  headerSub:   { fontSize:9, color:'rgba(255,255,255,0.6)', letterSpacing:2, marginTop:1 },
  saldoBox:    { backgroundColor:'rgba(255,255,255,0.18)', borderWidth:1, borderColor:'rgba(255,255,255,0.3)', borderRadius:12, paddingVertical:6, paddingHorizontal:14, alignItems:'center' },
  saldoLabel:  { fontSize:9, color:'rgba(255,255,255,0.6)', letterSpacing:1 },
  saldoValor:  { fontSize:17, fontWeight:'800', color:'#fff' },

  // Nav
  nav:          { flexDirection:'row', backgroundColor:'#fff', borderTopWidth:1, borderTopColor:'#bfdbfe', shadowColor:'#2563eb', shadowOpacity:0.1, shadowRadius:8, elevation:10 },
  navBtn:       { flex:1, alignItems:'center', paddingVertical:10, borderTopWidth:3, borderTopColor:'transparent' },
  navBtnAtivo:  { borderTopColor:'#2563eb' },
  navIcon:      { fontSize:20 },
  navLabel:     { fontSize:10, fontWeight:'500', color:'#6b8caa', marginTop:2 },
  navLabelAtivo:{ fontWeight:'700', color:'#2563eb' },
});

import { Stack } from 'expo-router';
import '../global.css';

export default function WebLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            background: white;
          }
          body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            background: white;
          }
          #root {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background: white;
          }
          * {
            box-sizing: border-box;
          }
          .web-safe-view {
            flex: 1;
            background: white;
            min-height: 100vh;
            width: 100%;
          }
          .web-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 16px;
          }
          .web-card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 16px;
            margin-bottom: 16px;
          }
          .web-button {
            background: #138B31;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-weight: bold;
          }
          .web-button:hover {
            opacity: 0.9;
          }
          .web-text {
            color: #333;
          }
        `
      }} />
    </>
  );
}
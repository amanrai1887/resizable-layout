// Layout.js
import React, { useState, useEffect } from 'react';
import './Layout.css';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';
import ChildContainer from './ChildContainer';
import axios from 'axios';

const Layout = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    fetchIds();
  }, []);

  const fetchIds = async () => {
    try {
      const response = await axios.get('https://resizable-layout.onrender.com/api/component/');
      // Map both uuid and name from the response data
      const componentData = response.data.component.map(comp => ({
        uuid: comp.uuid,
        name: comp.name
      }));
      setComponents(componentData);
    } catch (error) {
      console.error('Error fetching IDs:', error);
    }
  };

  return (
    <div className="container">
      <PanelGroup direction="vertical">
        <Panel>
          <PanelGroup direction="horizontal" className="hori">
            {/* Render the first Panel and ChildContainer */}
            {components.length > 0 && (
              <Panel key={components[0].uuid} defaultSize={20} minSize={20} maxSize={75}>
                <ChildContainer id={components[0].uuid} name={components[0].name} />
              </Panel>
            )}
            {/* Render the second Panel and ChildContainer if components.length is 2 or more */}
            {components.length > 1 && (
              <>
                <PanelResizeHandle />
                <Panel defaultSize={50} minSize={20}  maxSize={75}>
                  <ChildContainer id={components[1].uuid} name={components[1].name} />
                </Panel>
              </>
            )}
          </PanelGroup>
        </Panel>
        {/* Render the third Panel and ChildContainer if components.length is 3 or more */}
        {components.length > 2 && (
          <>
            <PanelResizeHandle />
            <Panel defaultSize={40} minSize={20}  maxSize={75}>
              <ChildContainer id={components[2].uuid} name={components[2].name} />
            </Panel>
          </>
        )}
      </PanelGroup>
    </div>
  );
};

export default Layout;

'use client';
import React, { useState, useEffect } from 'react';
import { WidgetCustomizer } from '@/components';
import { getWidgetTemplate } from '@/lib/utils';

const WidgetCustomizerExample = () => {
  const [widgetData, setWidgetData] = useState(null);
  const [widget, setWidget] = useState(null);
  
  useEffect(() => {
    // Load a sample widget definition
    const headerWidget = getWidgetTemplate('header_navigation', 'header_navigation_1');
    if (headerWidget) {
      setWidget({
        folder: 'header_navigation',
        templateId: 'header_navigation_1',
        title: headerWidget.title || 'Header Navigation',
        metadata: headerWidget.metadata || {}
      });
      
      // Initialize with default data
      setWidgetData(headerWidget.header_navigation_default_data || {});
    }
  }, []);
  
  const handleDataChange = (newData) => {
    setWidgetData(newData);
    console.log('Widget data updated:', newData);
  };
  
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Widget Customizer Example</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ flex: '1 1 50%' }}>
          <WidgetCustomizer 
            widget={widget}
            data={widgetData}
            onChange={handleDataChange}
          />
        </div>
        
        <div style={{ flex: '1 1 50%', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h3>Preview Data</h3>
          <pre style={{ overflow: 'auto', maxHeight: '600px' }}>
            {JSON.stringify(widgetData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default WidgetCustomizerExample;

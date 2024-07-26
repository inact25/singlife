import { useState } from 'react';

// Utility functions
const getBrowserLanguage = (): string => navigator.language || 'en-sg';
const getCurrentCountry = (): string => 'sg';
const getSiteId = (): string => 'sg-dreamcube';

const separatedPath = (): string[] => {
  const path = window.location.pathname;
  return path.split('/');
};

// Adobe hook
const useAdobe = () => {
  const [layers, setLayers] = useState<any[]>([]);

  const push = ({
    type = 'mobile',
    navLevel1 = '',
    navLevel2 = '',
    navLevel3 = '',
  } = {}) => {
    const dataLayer = layers ?? [];
    if (!navLevel1 && !navLevel2 && !navLevel3) {
      const path = separatedPath();
      navLevel1 = path[1] ?? '';
      navLevel2 = path[2] ?? '';
      navLevel3 = path[3] ?? '';
    }
    dataLayer.push({
      siteId: getSiteId(),
      language: getBrowserLanguage(),
      country: getCurrentCountry(),
      versionNum: '1.0.0',
      brand: 'singlife',
      type,
      navLevel1,
      navLevel2,
      navLevel3,
    });
    setLayers(dataLayer);
  };

  const pushForm = (step: string, option: string) => {
    const name = 'sg|dreamcube-quiz';
    if (window?._satellite) {
      const payload = {
        siteId: getSiteId(),
        language: getBrowserLanguage(),
        country: getCurrentCountry(),
        versionNum: '1.0.0',
        type: 'mobile',
        form: {
          option,
          name,
          step,
        },
      };
      window._satellite.track('track_form_view', payload);
      window._satellite.track('track_form_submit', payload);
    }
  };

  const startForm = () => {
    const name = 'sg|dreamcube-quiz';
    if (window?._satellite) {
      window._satellite.track('track_form_start', {
        siteId: getSiteId(),
        language: getBrowserLanguage(),
        country: getCurrentCountry(),
        versionNum: '1.0.0',
        type: 'mobile',
        form: {
          name,
          step: '',
          option: '',
        },
      });
    }
  };

  const completeForm = (trackedOptions: string[]) => {
    const name = 'sg|dreamcube-quiz';
    if (window?._satellite) {
      const pickOne = window?.dataLayer?.[0] ?? {};
      pickOne.form = {
        ...pickOne.form,
        name,
        option: trackedOptions.join('|'),
      };
      window.dataLayer = [pickOne];
      console.log('submit', pickOne);
      window._satellite.track('track_form_complete', pickOne);
    }
  };

  const apply = (): boolean => {
    if (window?._satellite) {
      window.dataLayer = layers;
      window._satellite.track('track_page_load', layers);
      setLayers([]);
      return true;
    }
    return false;
  };

  return { push, apply, pushForm, startForm, completeForm };
};

// CTA action
export const ctaAction = (type: string, text: string) => {
  if (window?._satellite) {
    window._satellite.track('track_cta_click', {
      siteId: getSiteId(),
      language: getBrowserLanguage(),
      country: getCurrentCountry(),
      versionNum: '1.0.0',
      type: 'mobile',
      cta: {
        type,
        text,
      },
    });
  }
};

export default useAdobe;

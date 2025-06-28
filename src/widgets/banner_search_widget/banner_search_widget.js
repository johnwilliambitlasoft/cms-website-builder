/**
 * Banner Search Widget for Bus Booking
 * Provides comprehensive city/route search functionality
 */

// ==============================================
// SCHEMA DEFINITION
// ==============================================

export const banner_search_widget_schema = {};

// ==============================================
// DEFAULT DATA
// ==============================================

export const banner_search_widget_default_data = {
};

// ==============================================
// METADATA
// ==============================================

const defaultMetadata = {
};

// ==============================================
// TEMPLATE 1: MODERN HERO SEARCH BANNER
// ==============================================

export const banner_search_widget_1 = {
  id: "banner_search_widget_1",
  title: `Banner Search Widget`,
  html: `
  <script src="lib/splide/splide.min.js"></script>
  <link rel="stylesheet" href="lib/splide/splide.min.css">
  <link rel="stylesheet" href="lib/splide/splide-default.min.css">
  <div class="splide banner-slider" role="group" aria-label="Banner Background Slider">
      <div class="splide__track">
        <ul class="splide__list">
          <li class="splide__slide" style="background-image: url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');">
            <div class="slide-overlay">
              <h1>Search Your Bus Route</h1>
            </div>
          </li>
          <li class="splide__slide" style="background-image: url('https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');">
            <div class="slide-overlay">
              <h1>Find Your Perfect Journey</h1>
            </div>
          </li>
          <li class="splide__slide" style="background-image: url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');">
            <div class="slide-overlay">
              <h1>Explore New Destinations</h1>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
    debugger
      var splide = new Splide('.splide', {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        gap: '1rem',
        breakpoints: {
          768: {
            perPage: 1,
          },
        },
      });
      splide.mount();
    });
  </script>
  `,
  css: `
    .splide {
      max-width: 800px;
      margin: 50px auto;
    }
    .splide__slide {
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-size: 24px;
      font-weight: bold;
      border-radius: 10px;
      margin: 0 10px;
    }
    .slide-overlay h1 {
      text-align: center;
      margin: 20px 0;
      color: #333;
    }
  `,
  metadata: {
    id: "banner_search_widget_1",
    templateId: "banner_search_widget_1",
    thumbnail: "/assets/svg/banner_search.svg",
    ...defaultMetadata,
  },
};


// ==============================================
// JAVASCRIPT FUNCTIONALITY & REACT INTEGRATION
// ==============================================

/**
 * Widget JavaScript functionality
 * This runs when the widget is rendered on the published site
 */
export const banner_search_widget_script = function () {
  // Initialize widget functionality when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }

  function initWidget() {
    // Find all search widgets on the page
    var widgets = document.querySelectorAll('[data-search-widget]');

    for (var i = 0; i < widgets.length; i++) {
      setupSearchWidget(widgets[i]);
    }
  }

  function setupSearchWidget(widget) {
    var widgetData = getWidgetData(widget);

    // Set up city autocomplete
    setupCityAutocomplete(widget, widgetData);

    // Set up form submission
    setupFormSubmission(widget, widgetData);

    // Set up popular cities
    setupPopularCities(widget, widgetData);

    // Set up swap functionality
    setupSwapFunctionality(widget);

    // Connect to global store if available
    if (window.Store) {
      connectToStore(widget);
    }
  }

  function getWidgetData(widget) {
    // Extract widget configuration from data attributes or embedded JSON
    try {
      var dataScript = widget.querySelector('script[type="application/json"]');
      if (dataScript) {
        return JSON.parse(dataScript.textContent);
      }
    } catch (e) {
      console.warn('Failed to parse widget data:', e);
    }

    // Fallback to default data
    return banner_search_widget_default_data;
  }

  function setupCityAutocomplete(widget, widgetData) {
    var cityInputs = widget.querySelectorAll('[data-autocomplete]');

    for (var i = 0; i < cityInputs.length; i++) {
      var input = cityInputs[i];
      var dropdownContainer = input.parentNode.querySelector('.autocomplete-dropdown');

      if (!dropdownContainer) {
        // Create dropdown if it doesn't exist
        dropdownContainer = document.createElement('div');
        dropdownContainer.className = 'autocomplete-dropdown';
        input.parentNode.appendChild(dropdownContainer);
      }

      setupInputAutocomplete(input, dropdownContainer, widgetData);
    }
  }

  function setupInputAutocomplete(input, dropdown, widgetData) {
    var timeout;
    var currentQuery = '';
    var selectedIndex = -1;

    // Input event handler
    input.addEventListener('input', function () {
      var query = this.value.trim();
      currentQuery = query;
      selectedIndex = -1;

      clearTimeout(timeout);

      if (query.length >= (widgetData.apiConfig?.minSearchLength || 2)) {
        timeout = setTimeout(function () {
          performCitySearch(query, dropdown, input);
        }, 300);
      } else {
        hideDropdown(dropdown);
      }
    });

    // Keyboard navigation
    input.addEventListener('keydown', function (e) {
      var items = dropdown.querySelectorAll('.autocomplete-item[data-city-code]');

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
          updateSelection(items, selectedIndex);
          break;

        case 'ArrowUp':
          e.preventDefault();
          selectedIndex = Math.max(selectedIndex - 1, -1);
          updateSelection(items, selectedIndex);
          break;

        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && items[selectedIndex]) {
            selectCity(items[selectedIndex], input, dropdown);
          }
          break;

        case 'Escape':
          hideDropdown(dropdown);
          input.blur();
          break;
      }
    });

    // Focus and blur events
    input.addEventListener('focus', function () {
      if (currentQuery.length >= 2) {
        performCitySearch(currentQuery, dropdown, input);
      }
    });

    input.addEventListener('blur', function () {
      setTimeout(function () {
        hideDropdown(dropdown);
      }, 200);
    });
  }

  function performCitySearch(query, dropdown, input) {
    // Show loading state
    showDropdownLoading(dropdown);

    if (window.API && window.API.searchCities) {
      window.API.searchCities(query)
        .then(function (cities) {
          showCityResults(dropdown, cities, input);
        })
        .catch(function (error) {
          console.error('City search failed:', error);
          hideDropdown(dropdown);
        });
    } else {
      // Fallback to popular cities filter
      var popularCities = banner_search_widget_default_data.popularCities || [];
      var filtered = popularCities.filter(function (city) {
        return city.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
      showCityResults(dropdown, filtered, input);
    }
  }

  function showDropdownLoading(dropdown) {
    dropdown.innerHTML = '<div class="autocomplete-item loading">Searching...</div>';
    dropdown.style.display = 'block';
  }

  function showCityResults(dropdown, cities, input) {
    var html = '';

    if (cities.length === 0) {
      html = '<div class="autocomplete-item no-results">No cities found</div>';
    } else {
      for (var i = 0; i < Math.min(cities.length, 10); i++) {
        var city = cities[i];
        html += '<div class="autocomplete-item" data-city-code="' + (city.code || '') + '" data-city-name="' + city.name + '">' +
          '<div class="city-name">' + city.name + '</div>' +
          (city.state ? '<div class="city-state">' + city.state + '</div>' : '') +
          '</div>';
      }
    }

    dropdown.innerHTML = html;
    dropdown.style.display = 'block';

    // Add click handlers
    var items = dropdown.querySelectorAll('.autocomplete-item[data-city-code]');
    for (var i = 0; i < items.length; i++) {
      items[i].addEventListener('click', function () {
        selectCity(this, input, dropdown);
      });
    }
  }

  function selectCity(item, input, dropdown) {
    var cityName = item.getAttribute('data-city-name');
    var cityCode = item.getAttribute('data-city-code');

    input.value = cityName;
    input.setAttribute('data-city-code', cityCode);
    hideDropdown(dropdown);

    // Trigger change event
    var event = new Event('change', { bubbles: true });
    input.dispatchEvent(event);
  }

  function updateSelection(items, selectedIndex) {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle('highlighted', i === selectedIndex);
    }
  }

  function hideDropdown(dropdown) {
    dropdown.style.display = 'none';
  }

  function setupFormSubmission(widget, widgetData) {
    var form = widget.querySelector('[data-search-form]');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var searchParams = extractSearchParams(form);

      // Validate search parameters
      if (!validateSearchParams(searchParams)) {
        return;
      }

      // Show loading state
      showSearchLoading(widget);

      // Dispatch to store
      if (window.Store) {
        window.Store.dispatch(window.Store.actions.startSearch(searchParams));
      }

      // Perform search
      if (window.SearchResult) {
        window.SearchResult.search(searchParams);
      } else {
        // Fallback: redirect to results page
        redirectToResults(searchParams);
      }

      // Track search event
      if (window.GTMAction) {
        window.GTMAction.trackEvent('Search', 'BusRoute', searchParams.from + ' to ' + searchParams.to);
      }
    });
  }

  function extractSearchParams(form) {
    var formData = new FormData(form);

    return {
      from: formData.get('fromCity'),
      fromCode: form.querySelector('[name="fromCity"]').getAttribute('data-city-code'),
      to: formData.get('toCity'),
      toCode: form.querySelector('[name="toCity"]').getAttribute('data-city-code'),
      date: formData.get('departureDate'),
      returnDate: formData.get('returnDate'),
      passengers: parseInt(formData.get('passengers')) || 1
    };
  }

  function validateSearchParams(params) {
    if (!params.from || !params.to) {
      showError('Please select both departure and destination cities');
      return false;
    }

    if (!params.date) {
      showError('Please select a departure date');
      return false;
    }

    if (new Date(params.date) < new Date().setHours(0, 0, 0, 0)) {
      showError('Please select a future date');
      return false;
    }

    if (params.from === params.to) {
      showError('Departure and destination cities must be different');
      return false;
    }

    return true;
  }

  function showError(message) {
    // Create or update error message
    var errorDiv = document.querySelector('.search-error-message');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'search-error-message';
      var form = document.querySelector('[data-search-form]');
      if (form) {
        form.appendChild(errorDiv);
      }
    }

    errorDiv.textContent = message;
    errorDiv.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(function () {
      errorDiv.style.display = 'none';
    }, 5000);
  }

  function showSearchLoading(widget) {
    var loadingOverlay = widget.querySelector('.search-loading');
    if (loadingOverlay) {
      loadingOverlay.style.display = 'flex';
    }
  }

  function setupPopularCities(widget, widgetData) {
    var cityTags = widget.querySelectorAll('.city-tag');

    for (var i = 0; i < cityTags.length; i++) {
      cityTags[i].addEventListener('click', function () {
        var cityName = this.getAttribute('data-name');
        var cityCode = this.getAttribute('data-city');

        // Find first empty input
        var fromInput = widget.querySelector('[name="fromCity"]');
        var toInput = widget.querySelector('[name="toCity"]');

        if (fromInput && !fromInput.value) {
          fromInput.value = cityName;
          fromInput.setAttribute('data-city-code', cityCode);
          fromInput.dispatchEvent(new Event('change'));
        } else if (toInput && !toInput.value) {
          toInput.value = cityName;
          toInput.setAttribute('data-city-code', cityCode);
          toInput.dispatchEvent(new Event('change'));
        }
      });
    }
  }

  function setupSwapFunctionality(widget) {
    var swapButtons = widget.querySelectorAll('.swap-btn, .compact-swap');

    for (var i = 0; i < swapButtons.length; i++) {
      swapButtons[i].addEventListener('click', function () {
        var fromInput = widget.querySelector('[name="fromCity"]');
        var toInput = widget.querySelector('[name="toCity"]');

        if (fromInput && toInput) {
          var tempValue = fromInput.value;
          var tempCode = fromInput.getAttribute('data-city-code');

          fromInput.value = toInput.value;
          fromInput.setAttribute('data-city-code', toInput.getAttribute('data-city-code') || '');

          toInput.value = tempValue;
          toInput.setAttribute('data-city-code', tempCode || '');

          // Trigger change events
          fromInput.dispatchEvent(new Event('change'));
          toInput.dispatchEvent(new Event('change'));
        }
      });
    }
  }

  function connectToStore(widget) {
    // Subscribe to store changes
    if (window.Store.subscribe) {
      window.Store.subscribe(function (state, prevState) {
        // Handle search state changes
        if (state.search !== prevState.search) {
          updateWidgetFromStore(widget, state.search);
        }
      });
    }
  }

  function updateWidgetFromStore(widget, searchState) {
    var loadingOverlay = widget.querySelector('.search-loading');

    if (searchState.isSearching) {
      if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
      }
    } else {
      if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
      }

      if (searchState.error) {
        showError(searchState.error);
      }
    }
  }

  function redirectToResults(searchParams) {
    // Fallback: construct URL and redirect
    var params = new URLSearchParams();
    params.append('from', searchParams.from);
    params.append('to', searchParams.to);
    params.append('date', searchParams.date);
    if (searchParams.returnDate) {
      params.append('returnDate', searchParams.returnDate);
    }
    params.append('passengers', searchParams.passengers);

    window.location.href = '/search-results?' + params.toString();
  }
};

// Register the widget script to run automatically
if (typeof window !== 'undefined') {
  // Auto-execute the script when this file is loaded
  banner_search_widget_script();
}



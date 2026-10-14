import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';
import { STORAGE_KEY } from '../utils/storage';

describe('Widget Settings Studio (App Integration)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('renders studio header, business settings, preset goals, and live preview', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Widget Settings Studio/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Business Name/i)).toHaveValue('Your Business');
    expect(screen.getByLabelText(/Website URL/i)).toHaveValue('https://example.com');
    expect(screen.getByLabelText(/Call-to-Action Text/i)).toHaveValue('Qualify Now');

    // Live preview elements
    expect(screen.getByTestId('widget-preview-card')).toBeInTheDocument();
    expect(screen.getByText(/Interactive Demo \(Simulated Flow\)/i)).toBeInTheDocument();
  });

  it('updates live preview immediately when business name is edited', async () => {
    const user = userEvent.setup();
    render(<App />);

    const businessInput = screen.getByLabelText(/Business Name/i);
    await user.clear(businessInput);
    await user.type(businessInput, 'Apex Cloud Solutions');

    // Live preview should immediately reflect the new name in hero and widget card
    expect(screen.getByText(/Grow pipeline with AI qualification on Apex Cloud Solutions/i)).toBeInTheDocument();
  });

  it('switches qualification presets, updating objective and starting questions', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Click "Agency Prospect Discovery" preset button
    const agencyPreset = screen.getByRole('button', { name: /Agency Prospect Discovery/i });
    await user.click(agencyPreset);

    // Objective should update to agency objective
    const objectiveInput = screen.getByLabelText(/Qualification Objective/i);
    expect(objectiveInput).toHaveValue(
      'Discover incoming client project scopes, monthly retainer range, and decision-maker readiness to ensure high-value proposal alignment.'
    );

    // Agency questions should be loaded
    expect(screen.getByDisplayValue(/What services are you seeking help with\?/i)).toBeInTheDocument();
  });

  it('allows adding, editing, and deleting questions', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Add new question
    const addQuestionBtn = screen.getByRole('button', { name: /Add Question/i });
    await user.click(addQuestionBtn);

    // Find the newly added question input (it will be empty)
    const emptyInputs = screen.getAllByPlaceholderText(/e\.g\., What is your estimated annual budget\?/i);
    const newestInput = emptyInputs[emptyInputs.length - 1];
    await user.type(newestInput, 'What CRM do you currently use?');

    expect(newestInput).toHaveValue('What CRM do you currently use?');

    // Delete question
    const removeButtons = screen.getAllByLabelText(/Remove question/i);
    const initialCount = removeButtons.length;
    await user.click(removeButtons[removeButtons.length - 1]);

    const afterCount = screen.getAllByLabelText(/Remove question/i).length;
    expect(afterCount).toBe(initialCount - 1);
  });

  it('allows adding answer options to single-select questions', async () => {
    const user = userEvent.setup();
    render(<App />);

    const addOptionBtns = screen.getAllByRole('button', { name: /Add Option/i });
    const initialOptionsCount = screen.getAllByPlaceholderText(/Option \d+ text/i).length;

    await user.click(addOptionBtns[0]);

    const updatedOptionsCount = screen.getAllByPlaceholderText(/Option \d+ text/i).length;
    expect(updatedOptionsCount).toBe(initialOptionsCount + 1);
  });

  it('switches design templates without erasing questions or objective', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Enter custom objective
    const objectiveInput = screen.getByLabelText(/Qualification Objective/i);
    await user.clear(objectiveInput);
    await user.type(objectiveInput, 'Custom Test Objective');

    // Switch to Bold template
    const boldBtn = screen.getByRole('button', { name: /Bold High Contrast & Expressive/i });
    await user.click(boldBtn);

    // Template badge in preview should show Bold Theme
    expect(screen.getByText(/Bold Theme/i)).toBeInTheDocument();

    // Objective must be preserved!
    expect(screen.getByLabelText(/Qualification Objective/i)).toHaveValue('Custom Test Objective');
  });

  it('restores active template defaults without clearing business settings', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Change primary color
    const colorInput = screen.getByLabelText(/Pick custom primary color/i);
    fireEvent.change(colorInput, { target: { value: '#e11d48' } });

    // Click "Restore Theme Defaults"
    const restoreThemeBtn = screen.getByRole('button', { name: /Restore Theme Defaults/i });
    await user.click(restoreThemeBtn);

    // Business Name should still be 'Your Business'
    expect(screen.getByLabelText(/Business Name/i)).toHaveValue('Your Business');
    expect(screen.getByText(/Theme Defaults Restored/i)).toBeInTheDocument();
  });

  it('blocks saving and displays validation errors for invalid fields', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Clear Business Name
    const businessInput = screen.getByLabelText(/Business Name/i);
    await user.clear(businessInput);

    // Enter invalid URL
    const urlInput = screen.getByLabelText(/Website URL/i);
    await user.clear(urlInput);
    await user.type(urlInput, 'invalid-url');

    // Attempt save
    const saveBtn = screen.getByRole('button', { name: /Save Configuration/i });
    await user.click(saveBtn);

    // Expect error messages
    expect(screen.getByText('Business name is required.')).toBeInTheDocument();
    expect(screen.getByText(/Please enter a valid HTTP or HTTPS URL/i)).toBeInTheDocument();
    expect(screen.getByText(/Validation Errors Detected/i)).toBeInTheDocument();

    // Storage must NOT be written
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('saves valid configuration to localStorage and shows success toast', async () => {
    const user = userEvent.setup();
    render(<App />);

    const saveBtn = screen.getByRole('button', { name: /Save Configuration/i });
    await user.click(saveBtn);

    await waitFor(() => {
      expect(screen.getByText(/Configuration Saved Successfully/i)).toBeInTheDocument();
    });

    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).not.toBeNull();
  });

  it('restores saved configuration on reload', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        businessName: 'Persisted Acme Corp',
        websiteUrl: 'https://acme.org',
        objective: 'Saved objective test',
        selectedPresetId: 'enterprise',
        questions: [{ id: 'q-1', label: 'Saved Question', type: 'short_text' }],
        appearance: {
          template: 'minimal',
          primaryColor: '#0f172a',
          position: 'bottom-left',
          ctaText: 'Custom CTA',
        },
      })
    );

    render(<App />);

    expect(screen.getByLabelText(/Business Name/i)).toHaveValue('Persisted Acme Corp');
    expect(screen.getByLabelText(/Website URL/i)).toHaveValue('https://acme.org');
    expect(screen.getByText(/Restored Saved Configuration/i)).toBeInTheDocument();
  });

  it('resets studio configuration to initial defaults when Reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Change business name
    const businessInput = screen.getByLabelText(/Business Name/i);
    await user.clear(businessInput);
    await user.type(businessInput, 'Temporary Company');

    // Click Reset
    const resetBtn = screen.getByRole('button', { name: /Reset/i });
    await user.click(resetBtn);

    // Restores default
    expect(screen.getByLabelText(/Business Name/i)).toHaveValue('Your Business');
    expect(screen.getByText(/Studio Reset Complete/i)).toBeInTheDocument();
  });
});

before(() => {
    cy.env(['webDriverUniversity']).then(({ webDriverUniversity }) => {
        cy.visit(`${webDriverUniversity}Datepicker/index.html`);
    });
});

const targetDate = '12-26-2026';
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const navigateYearRange = (steps: number, direction: 'prev' | 'next') => {
    // Move the calendar view forward or backward by the required number of decade steps.
    for (let i = 0; i < Math.abs(steps); i++) {
        cy.get('.datepicker').find(`.${direction}`).filter(':visible').first().click();
    }
};

const selectDate = (dateString: string) => {
    // Split the incoming date like 12-26-1988 into month, day, and year values.
    const [targetMonth, targetDay, targetYear] = dateString.split('-').map(Number);

    // Open the date picker by clicking the calendar icon.
    cy.get('#datepicker .glyphicon-calendar').click();
    // Make sure the calendar popup is visible before interacting with it.
    cy.get('.datepicker').should('be.visible');

    // Click the datepicker title twice to switch from the day view to the month view and then to the year view.
    cy.get('.datepicker').find('.datepicker-switch').filter(':visible').first().click();
    cy.get('.datepicker').find('.datepicker-switch').filter(':visible').first().click();

    // Read the currently displayed year range so we can move to the target year dynamically.
    cy.get('.datepicker').find('.datepicker-switch').filter(':visible').first().invoke('text').then((label) => {
        const rangeMatch = label.match(/(\d{4})\s*-\s*(\d{4})/);
        // This code uses a JavaScript Regular Expression (RegEx) to search for, 
        // extract, and match a year range inside a text string (the label variable). 
        // It specifically looks for two 4-digit numbers separated by a hyphen, optionally surrounded by spaces 
        // (for example: "2020-2030" or "2020 - 2030")
        // 1. The RegEx Pattern Breakdown 
        // /(\d{4})\s*-\s*(\d{4})// ... /: Delimits the start and end of the regular expression pattern.
        // (\d{4}): This is Capture Group 1. It looks for exactly four consecutive digits (0-9). 
        // This extracts the starting year.\s*: Looks for zero or more spaces. 
        // This handles labels that format ranges with or without whitespace around the hyphen.
        // -: Matches the literal hyphen character connecting the two years.
        // (\d{4}): This is Capture Group 2. It looks for another four consecutive digits. This extracts the ending year.
        const startYear = rangeMatch ? Number(rangeMatch[1]) : Number(label.match(/(\d{4})/)?.[1] ?? targetYear);
        const steps = Math.floor((targetYear - startYear) / 10);

        // If the target year is later, move forward; if earlier, move backward.
        if (steps > 0) {
            navigateYearRange(steps, 'next');
        } else if (steps < 0) {
            navigateYearRange(Math.abs(steps), 'prev');
        }
    });

    // Choose the exact year, month, and day from the opened calendar.
    cy.get('.datepicker').find('.year').filter(':visible').contains(`${targetYear}`).click();
    cy.get('.datepicker').find('.month').filter(':visible').contains(monthNames[targetMonth - 1]).click();
    cy.get('.datepicker').find('.day').filter(':visible').contains(`${targetDay}`).click();

    // Confirm that the input field now contains the selected date in the expected format.
    cy.get('.form-control').should('have.value', `${targetMonth}-${targetDay}-${targetYear}`);
};

describe('Date Picker (basic)', () => {
    it('selects the target day', () => {
        selectDate(targetDate);
    });
})


// This code determines a numeric starting year from a text string (label), 
// providing multiple fallback levels if the string doesn't match the expected layout.
// Here is exactly how it evaluates step-by-step from left to right:
// 
// 1. The Main Condition (rangeMatch ? ... : ...)
// It checks if rangeMatch exists (meaning the previous year-range regex found a pattern like "2020-2030").
// If true: It takes rangeMatch[1] (the first captured 4-digit year, e.g., "2020"), converts it to a number via Number(), and assigns it to startYear.
// If false: It skips to the fallback evaluation after the colon (:).
// 
// 2. The First Fallback (Number(label.match(/(\d{4})/)?.[1] ...)
// If rangeMatch was null (meaning the label isn't a range, but might be a single month/year like "July 2026"):label.match(/(\d{4})/)[1]: 
// It runs a new regex to search for the very first 4-digit number anywhere in the label text.?. 
// (Optional Chaining): This ensures that if no 4-digit number exists at all (e.g., the label is just "Select Date"), 
// the code won't crash with a TypeError. It safely returns undefined instead.
// 
// 3. The Final Fallback (?? targetYear)?? (Nullish Coalescing): 
// If the single-year regex search also fails and returns undefined or null, 
// this operator kicks in.It defaults the assignment to a predefined variable named targetYear.




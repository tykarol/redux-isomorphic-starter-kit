export const RESET_FLASH_MESSAGE = 'RESET_FLASH_MESSAGE';

// Resets the currently visible error message.
export function resetFlashMessage() {
    return {
        type: RESET_FLASH_MESSAGE
    };
}

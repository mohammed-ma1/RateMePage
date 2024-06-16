import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

/**
 * NotificationService provides methods to show success, error, and info notifications.
 * Created by Laith Bzour.
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Opens a snack bar with the specified message, panel class, and duration.
   * @param {string} message - The message to be displayed in the snack bar.
   * @param {string} panelClass - The CSS class to apply to the snack bar panel.
   * @param {number} duration - The duration for which the snack bar should be visible.
   */
  private openSnackBar(message: string, panelClass: string, duration: number): void {
    const config: MatSnackBarConfig = { duration, panelClass: [panelClass] };
    this.snackBar.open(message, 'Close', config);
  }

  /**
   * Shows a success notification with the specified message and duration.
   * @param {string} message - The success message to be displayed.
   * @param {number} duration - The duration for which the success notification should be visible.
   */
  showSuccess = (message: string, duration = 3000): void => this.openSnackBar(message, 'success-snackbar', duration);

  /**
   * Shows an error notification with the specified message and duration.
   * @param {string} message - The error message to be displayed.
   * @param {number} duration - The duration for which the error notification should be visible.
   */
  showError = (message: string, duration = 3000): void => this.openSnackBar(message, 'error-snackbar', duration);

  /**
   * Shows an info notification with the specified message and duration.
   * @param {string} message - The info message to be displayed.
   * @param {number} duration - The duration for which the info notification should be visible.
   */
  showInfo = (message: string, duration = 3000): void => this.openSnackBar(message, 'info-snackbar', duration);
}

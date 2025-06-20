import { type ToastProps } from "@heroui/react";
import { addToast } from "@heroui/toast";

export { addToast } from "@heroui/toast";

class ToastHandler {
    private static instance: ToastHandler;
    private constructor() {}

    public static getInstance(): ToastHandler {
        if (!ToastHandler.instance) {
            ToastHandler.instance = new ToastHandler();
        }
        return ToastHandler.instance;
    }

    public error(message: string, title: string = "Error", props: Partial<ToastProps> = {}) {
        addToast({
            title: title,
            description: message,
            color: "danger",
            ...props
        });
    }

    public success(message: string, title: string = "Success", props: Partial<ToastProps> = {}) {
        addToast({
            title: title,
            description: message,
            color: "success",
            ...props
        });
    }
}

export const toast = ToastHandler.getInstance();
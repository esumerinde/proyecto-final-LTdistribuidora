import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Trash2,
  ChevronRight,
} from "lucide-react";
import "./LTNotifications.css";

const LTNotifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 101,
      message: "¡Nuevo producto en tu marca favorita: Samsung Galaxy S24!",
      type: "new",
      isRead: false,
      date: "hace 5 min",
    },
    {
      id: 102,
      message: 'Tu reserva #5001 ha sido actualizada a "Confirmada".',
      type: "update",
      isRead: false,
      date: "hace 2 horas",
    },
    {
      id: 103,
      message: "Se ha iniciado sesión en un nuevo dispositivo.",
      type: "alert",
      isRead: true,
      date: "ayer",
    },
    {
      id: 104,
      message: "¡Oferta flash: 50% de descuento en notebooks!",
      type: "new",
      isRead: false,
      date: "hace 1 día",
    },
    {
      id: 105,
      message: "Recordatorio: Tenés productos en favoritos con ofertas.",
      type: "update",
      isRead: true,
      date: "hace 3 días",
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getIcon = (type) => {
    switch (type) {
      case "new":
        return <Bell size={18} />;
      case "update":
        return <Info size={18} />;
      case "alert":
        return <AlertCircle size={18} />;
      default:
        return <Info size={18} />;
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="lt-account-container">
        {/* Breadcrumb */}
        <div className="lt-account-breadcrumb fade-in">
          <span
            className="lt-account-breadcrumb-link"
            onClick={() => navigate("/my-account")}
          >
            Mi cuenta
          </span>
          <ChevronRight size={14} className="lt-breadcrumb-separator" />
          <span className="lt-account-breadcrumb-current">Notificaciones</span>
        </div>

        <header className="lt-account-header">
          <h1 className="lt-account-title">
            <Bell className="lt-account-title-icon" />
            Notificaciones
          </h1>
        </header>

        <div className="lt-account-empty fade-in">
          <div className="lt-empty-icon-wrapper">
            <Bell className="lt-empty-icon" />
          </div>
          <p className="lt-empty-title">No hay notificaciones pendientes</p>
          <p className="lt-empty-description">¡Todo está al día!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="LTNotificationsContainer">
      {/* Breadcrumb */}
      <div className="LTNotificationsBreadcrumb fade-in">
        <span
          className="LTNotificationsBreadcrumbLink"
          onClick={() => navigate("/my-account")}
        >
          Mi cuenta
        </span>
        <ChevronRight size={14} />
        <span className="LTNotificationsBreadcrumbCurrent">Notificaciones</span>
      </div>

      <header className="LTNotificationsHeader fade-in">
        <div>
          <h1 className="LTNotificationsTitle">
            <Bell className="LTNotificationsTitleIcon" />
            Notificaciones
            {unreadCount > 0 && (
              <span className="LTNotificationsBadge">{unreadCount}</span>
            )}
          </h1>
          <p className="LTNotificationsSubtitle">
            {unreadCount > 0
              ? `Tenés ${unreadCount} ${
                  unreadCount === 1
                    ? "notificación nueva"
                    : "notificaciones nuevas"
                }`
              : "Todas tus notificaciones están leídas"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="LTNotificationsMarkAllBtn lt-button-light"
          >
            <CheckCircle size={18} />
            <span>Marcar todas como leídas</span>
          </button>
        )}
      </header>

      <div className="LTNotificationsList">
        {notifications.map((notification, index) => {
          const isNew = !notification.isRead;
          let typeClass = "";

          switch (notification.type) {
            case "new":
              typeClass = "LTNotificationItem--new";
              break;
            case "update":
              typeClass = "LTNotificationItem--update";
              break;
            case "alert":
              typeClass = "LTNotificationItem--alert";
              break;
            default:
              typeClass = "";
          }

          return (
            <div
              key={notification.id}
              className={`LTNotificationItem fade-in ${
                isNew ? "LTNotificationItem--unread" : ""
              } ${typeClass}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="LTNotificationIcon">
                {getIcon(notification.type)}
              </div>
              <div className="LTNotificationContent">
                <p className="LTNotificationMessage">{notification.message}</p>
                <p className="LTNotificationDate">{notification.date}</p>
              </div>
              <div className="LTNotificationActions">
                {isNew && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="LTNotificationActionBtn"
                    title="Marcar como leído"
                  >
                    <CheckCircle size={20} />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="LTNotificationActionBtn LTNotificationActionBtn--delete"
                  title="Eliminar"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LTNotifications;
